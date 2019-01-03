package se.yogurtthehor.peep.fourth.entities;

import se.yogurtthehor.peep.fourth.models.Dot;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement
public class DotsResult {
    private List<Dot> dots;

    public List<Dot> getDots() {
        return dots;
    }

    public void setDots(List<Dot> dots) {
        this.dots = dots;
    }
}
