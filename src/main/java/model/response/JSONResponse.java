package model.response;

public class JSONResponse {

    private long id;

    private String message;

    public JSONResponse() {
    }

    public JSONResponse(String message) {
        this.id = 0;
        this.message = message;
    }

    public JSONResponse(long id, String message) {
        this.id = id;
        this.message = message;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
