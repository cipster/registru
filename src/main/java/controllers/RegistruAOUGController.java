package controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class RegistruAOUGController {

    @RequestMapping(value = {"/registru-aoug"}, method = RequestMethod.GET)
    public ModelAndView overview() {
        ModelAndView model = new ModelAndView();
        model.setViewName("registruAOUG");

        return model;
    }
}
