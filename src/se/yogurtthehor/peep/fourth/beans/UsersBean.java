package se.yogurtthehor.peep.fourth.beans;

import org.hibernate.Session;
import se.yogurtthehor.peep.fourth.entities.LoginRequest;
import se.yogurtthehor.peep.fourth.models.LabUser;
import se.yogurtthehor.peep.fourth.utils.HibernateUtil;
import se.yogurtthehor.peep.fourth.utils.PasswordHashing;

import javax.ejb.Singleton;

@Singleton(name = "UsersEJB")
public class UsersBean {
    private final Session session;

    public UsersBean() {
        session = HibernateUtil.getSessionFactory().openSession();
    }

    public void saveUser(LabUser user) {
        session.getTransaction().begin();
        session.save(user);
        session.getTransaction().commit();
    }

    public boolean assertPassword(LoginRequest loginRequest) throws Exception {
        LabUser user = session.get(LabUser.class, loginRequest.getLogin());

        if (user == null) {
            return false;
        }

        return PasswordHashing.check(loginRequest.getPassword(), user.getPasswordHash());
    }

    public LabUser getUser(String login) {
        return session.get(LabUser.class, login);
    }
}
