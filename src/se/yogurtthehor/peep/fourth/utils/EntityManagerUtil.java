package se.yogurtthehor.peep.fourth.utils;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EntityManagerUtil {
    public static EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("JPAUnit");

}
