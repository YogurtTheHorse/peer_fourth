package se.yogurtthehor.peep.fourth.beans;

import org.hibernate.Session;
import se.yogurtthehor.peep.fourth.models.Dot;
import se.yogurtthehor.peep.fourth.utils.EntityManagerUtil;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import java.util.List;

@Singleton(name = "DotsEJB")
public class DotsBean {
    private final EntityManager entityManager;

    public DotsBean() {
        entityManager = EntityManagerUtil.getEntityManager();
    }

    public List<Dot> getDotsByAuthor(String authorName) {
        //noinspection unchecked
        return (List<Dot>) entityManager.createQuery("SELECT d FROM Dot d WHERE author = :author_name")
                .setParameter("author_name", authorName)
                .getResultList();
    }

    public void addDot(Dot dot) {
        entityManager.getTransaction().begin();

        dot.check();

        entityManager.persist(dot);
        entityManager.getTransaction().commit();
    }
}
