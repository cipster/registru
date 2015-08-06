package controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login(@RequestParam(value = "error", required = false) String error,
                              @RequestParam(value = "logout", required = false) String logout,
                              @RequestParam(value = "lang", required = false) String lang) {
        ModelAndView model = new ModelAndView();
        if (error != null) {
            model.addObject("error", true);
        }
        if (logout != null) {
            model.addObject("msg", true);
        }
        model.setViewName("login");

        return model;
    }
}
