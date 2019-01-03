package se.yogurtthehor.peep.fourth.servlets.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.Date;

@Path("sample")
public class SimpleService {
    @Path("greet")
    @GET
    public String doGreet() {
        return "Hello Stranger, the time is " + new Date();
    }
}
