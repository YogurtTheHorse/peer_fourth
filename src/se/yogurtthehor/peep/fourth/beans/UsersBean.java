package se.yogurtthehor.peep.fourth.beans;

import org.hibernate.Session;
import se.yogurtthehor.peep.fourth.models.LabUser;
import se.yogurtthehor.peep.fourth.utils.HibernateUtil;

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
}
