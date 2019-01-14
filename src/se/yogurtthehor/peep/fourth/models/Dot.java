package se.yogurtthehor.peep.fourth.models;

import java.io.Serializable;

public class Dot implements Serializable {
    private int id;
    private double x;
    private double y;
    private double r;
    private String author;
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
