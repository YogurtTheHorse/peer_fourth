package se.yogurtthehor.peep.fourth.servlets.api;

import se.yogurtthehor.peep.fourth.beans.DotsBean;
import se.yogurtthehor.peep.fourth.beans.UsersBean;
import se.yogurtthehor.peep.fourth.entities.*;
import se.yogurtthehor.peep.fourth.models.Dot;
import se.yogurtthehor.peep.fourth.models.LabUser;
import se.yogurtthehor.peep.fourth.utils.PasswordHashing;

import javax.ejb.EJB;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import java.util.ArrayList;
import java.util.Date;

@Path("users")
public class UsersApiServlet {
    @EJB
    private UsersBean users;
    @EJB
    private DotsBean dots;

    @Path("register")
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public RegisterResult register(RegisterRequest body, @Context HttpServletResponse resp, @Context HttpServletRequest req) throws Exception {
        LabUser user = new LabUser();
        user.setUsername(body.getLogin());
        user.setCreatedBy("register_api");
        user.setCreatedDate(new Date());
        user.setPasswordHash(PasswordHashing.getSaltedHash(body.getPassword()));

        users.saveUser(user);

        RegisterResult res = new RegisterResult();
        res.setSuccess(true);

        return res;
    }

    @Path("login")
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public LoginResult login(LoginRequest body, @Context HttpServletResponse resp, @Context HttpServletRequest req) throws Exception {
        LoginResult res = new LoginResult();

        if (users.assertPassword(body)) {
            res.setSuccess(true);

            req.getSession().setAttribute("login", body.getLogin());
        } else {
            res.setMessage("Password mismatch.");
            res.setSuccess(false);
        }

        return res;
    }

    @Path("info")
    @GET
    public String getLogin(@Context HttpServletRequest req) {
        String login = (String) req.getSession().getAttribute("login");

        if (login == null) {
            return "";
        }

        LabUser user = users.getUser(login);

        if (user == null) {
            return "";
        }

        return user.getUsername();
    }

    @Path("dots")
    @GET
    @Produces("application/json")
    @Consumes("application/json")
    public DotsResult getDots(@Context HttpServletRequest req) {
        DotsResult dotsRes = new DotsResult();
        String login =  (String) req.getSession().getAttribute("login");

        dotsRes.setDots(login == null ? new ArrayList<>() : dots.getDotsByAuthor(login));

        return dotsRes;
    }

    @Path("dots")
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public Dot addDot(Dot body, @Context HttpServletRequest req) {
        return body;
    }
}
