package se.yogurtthehor.peep.fourth.beans;

import se.yogurtthehor.peep.fourth.entities.LoginRequest;
import se.yogurtthehor.peep.fourth.models.LabUser;
import se.yogurtthehor.peep.fourth.utils.EntityManagerUtil;
import se.yogurtthehor.peep.fourth.utils.PasswordHashing;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;

@Singleton(name = "UsersEJB")
public class UsersBean {
    private final EntityManager entityManager;

    public UsersBean() {
        entityManager = EntityManagerUtil.getEntityManager();
    }

    public void saveUser(LabUser user) {
        entityManager.getTransaction().begin();
        entityManager.persist(user);
        entityManager.getTransaction().commit();
    }

    public boolean assertPassword(LoginRequest loginRequest) throws Exception {
        LabUser user = getUser(loginRequest.getLogin());

        if (user == null) {
            return false;
        }

        return PasswordHashing.check(loginRequest.getPassword(), user.getPasswordHash());
    }

    public LabUser getUser(String login) {
        return entityManager.find(LabUser.class, login);
    }
}
