package se.yogurtthehor.peep.fourth.servlets.api;

import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("/api")
public class RestApp extends ResourceConfig {
    public RestApp() {
        this.packages("se.yogurtthehor.peep.fourth.servlets.api");
    }
}
