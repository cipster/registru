package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import services.TipContinutService;

@Controller
public class DashboardController {

    @Autowired
    private TipContinutService tipContinutService;

    @RequestMapping(value = {"/dashboard", "/"}, method = RequestMethod.GET)
    public ModelAndView overview() {
        ModelAndView model = new ModelAndView();

        model.addObject("tipContinut", tipContinutService.findAll());
        model.setViewName("dashboard");

        return model;
    }
}
