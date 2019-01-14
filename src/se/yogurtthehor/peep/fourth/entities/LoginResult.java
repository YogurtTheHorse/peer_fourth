package se.yogurtthehor.peep.fourth.entities;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class LoginResult {
    private boolean success;
    private String username;
    private String message;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
