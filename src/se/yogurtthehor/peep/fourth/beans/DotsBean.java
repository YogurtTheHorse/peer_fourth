package se.yogurtthehor.peep.fourth.beans;

import org.hibernate.Session;
import org.hibernate.Transaction;
import se.yogurtthehor.peep.fourth.models.Dot;
import se.yogurtthehor.peep.fourth.utils.HibernateUtil;

import javax.ejb.Singleton;
import java.util.List;

@Singleton(name = "DotsEJB")
public class DotsBean {
    private final Session session;

    public DotsBean() {
        session = HibernateUtil.getSessionFactory().openSession();
    }

    public List<Dot> getDotsByAuthor(String authorName) {
        //noinspection unchecked
        return (List<Dot>) session.createQuery("FROM se.yogurtthehor.peep.fourth.models.Dot WHERE author = :author_name")
                .setParameter("author_name", authorName)
                .list();
    }

    public void addDot(Dot dot) {
        session.beginTransaction();

        dot.check();

        session.save(dot);
        session.getTransaction().commit();
    }
}
