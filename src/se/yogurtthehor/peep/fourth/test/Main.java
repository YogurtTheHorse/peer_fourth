package se.yogurtthehor.peep.fourth.test;

import java.util.Date;
import org.hibernate.Session;
import se.yogurtthehor.peep.fourth.models.LabUser;
import se.yogurtthehor.peep.fourth.utils.EntityManagerUtil;
import se.yogurtthehor.peep.fourth.utils.HibernateUtil;

import javax.persistence.EntityManager;

public class Main {
    public static void main(String[] args) {
        EntityManager entityManager = EntityManagerUtil.getEntityManager();
        entityManager.getTransaction().begin();

        LabUser user = new LabUser();

        user.setUsername("superman");
        user.setCreatedBy("system");
        user.setCreatedDate(new Date());

        entityManager.persist(user);
        entityManager.getTransaction().commit();
        entityManager.close();
        EntityManagerUtil.close();
    }

}
