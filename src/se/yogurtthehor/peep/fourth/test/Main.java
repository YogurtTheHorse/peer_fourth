package se.yogurtthehor.peep.fourth.test;

import java.util.Date;
import org.hibernate.Session;
import se.yogurtthehor.peep.fourth.models.LabUser;
import se.yogurtthehor.peep.fourth.utils.HibernateUtil;

public class Main {
    public static void main(String[] args) {
        Session session = HibernateUtil.getSessionFactory().openSession();

        session.beginTransaction();
        LabUser user = new LabUser();

        user.setUsername("superman");
        user.setCreatedBy("system");
        user.setCreatedDate(new Date());

        session.save(user);
        session.getTransaction().commit();
    }

}
