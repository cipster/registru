package services;import model.entity.*;import model.response.JSONResponse;import java.util.List;public interface RegistruService {    RegistruAOUGEntity saveAOUG(RegistruAOUGEntity entity);    RegistruOGBEntity saveOGB(RegistruOGBEntity entity);    CondicaPredarePrimireDocumenteEntity saveCondica(CondicaPredarePrimireDocumenteEntity entity);    IntrareEntity saveIntrare(IntrareEntity entity);    IesireEntity saveIesire(IesireEntity entity);    List<RegistruAOUGViewEntity> findAllAOUG();    List<IntrareViewEntity> findAllIntrari();    List<IesireEntity> findAllIesiri();    List<RegistruOGBViewEntity> findAllOGB();    List<CondicaPredarePrimireDocumenteViewEntity> findAllCondica();    JSONResponse formatFizicOGB(long id);    JSONResponse formatFizicAOUG(long id);    JSONResponse formatFizicIntrare(long id);    JSONResponse formatFizicIesire(long id);    String findLastNrCrtIntrare();    String findLastNrCrtAOUG();    String findLastNrCrtOGB();    String findLastNrCrtCondica();    JSONResponse anulareOGB(long id);    JSONResponse anulareAOUG(long id);    JSONResponse anulareIntrare(long id);    JSONResponse anulareIesire(long id);    JSONResponse anulareCondica(long id);    JSONResponse checkDuplicatAOUG(String val);    JSONResponse checkDuplicatOGB(String val);    JSONResponse checkDuplicatCondica(String val);    JSONResponse checkDuplicatIntrare(String val);}