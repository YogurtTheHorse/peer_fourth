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
import java.util.Comparator;
import java.util.Date;
import java.util.List;

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
    public RegisterResult register(RegisterRequest body, @Context HttpServletResponse resp, @Context HttpServletRequest req) {
        LabUser user = new LabUser();
        user.setUsername(body.getLogin());
        user.setCreatedBy("register_api");
        user.setCreatedDate(new Date());
        user.setPasswordHash(PasswordHashing.getSaltedHash(body.getPassword()));

        RegisterResult res = new RegisterResult();

        try {
            users.saveUser(user);
            res.setSuccess(true);
        } catch (Exception e) {
            res.setSuccess(false);
            res.setMessage("Login already taken");
        }

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
            res.setUsername(body.getLogin());

            req.getSession().setAttribute("login", body.getLogin());
        } else {
            res.setMessage("Password mismatch.");
            res.setSuccess(false);
        }

        return res;
    }

    @Path("logout")
    @GET
    public String logout(@Context HttpServletResponse resp, @Context HttpServletRequest req) {
        req.getSession().removeAttribute("login");
        return "{\"result\": \"ok\"}";
    }

    @Path("info")
    @GET
    @Produces("application/json")
    public String getSelf(@Context HttpServletRequest req) {
        String login = (String) req.getSession().getAttribute("login");
        String no_login = "{\"username\":null}";

        if (login == null) {
            return no_login;
        }

        LabUser user = users.getUser(login);

        if (user == null) {
            return no_login;
        }

        // escaping?..
        return "{\"username\":\""+user.getUsername() + "\"}";
    }

    @Path("dots")
    @GET
    @Produces("application/json")
    @Consumes("application/json")
    public DotsResult getDots(@Context HttpServletRequest req) {
        DotsResult dotsRes = new DotsResult();
        String login =  (String) req.getSession().getAttribute("login");

        List<Dot> dd = login == null ? new ArrayList<>() : dots.getDotsByAuthor(login);

        Comparator<Dot> comparator = Comparator.comparingInt(Dot::getId);
        dd.sort(comparator);

        dotsRes.setDots(dd);

        return dotsRes;
    }

    @Path("dots")
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public Dot addDot(Dot body, @Context HttpServletRequest req) {
        String login =  (String) req.getSession().getAttribute("login");

        body.setAuthor(login);
        dots.addDot(body);

        return body;
    }
}
