package controllers;import org.springframework.security.access.prepost.PreAuthorize;import org.springframework.stereotype.Controller;import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.RequestMethod;import org.springframework.web.servlet.ModelAndView;@Controllerpublic class AdminController {    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_SUPERUSER')")    @RequestMapping(value = {"/administration"}, method = RequestMethod.GET)    public ModelAndView overview() {        ModelAndView model = new ModelAndView();        model.setViewName("admin");        return model;    }}