package se.yogurtthehor.peep.fourth.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "jpa_dots")
public class Dot implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id")
    private int id;
    @Column(name = "x")
    private double x;
    @Column(name = "y")
    private double y;
    @Column(name = "r")
    private double r;
    @Column(name = "author")
    private String author;
    @Column(name = "is_checked")
    private boolean checked;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public void check() {
        if (x > 0) {
            checked = x <= r && y >= 0 && y <= r;
        } else {
            if (y > 0) {
                checked = (x * x) + (y * y) <= r * r;
            } else {
                checked = 2 * y >= -(x + r);
            }
        }
    }
}
