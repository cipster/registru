package model.repository;import model.entity.RegistruAOUGEntity;import org.springframework.data.jpa.repository.Query;import org.springframework.data.repository.CrudRepository;import java.sql.Date;import java.util.List;public interface RegistruAOUGRepository extends CrudRepository<RegistruAOUGEntity, Long> {    RegistruAOUGEntity findFirstByOrderByIdRegistruAougDesc();    RegistruAOUGEntity findOneByNrInregistrareEquals(String nrInregistrare);    @Query(value = "SELECT * FROM registru_aoug i WHERE i.rezervat = 1 AND i.data_inregistrare <= ?", nativeQuery = true)    List<RegistruAOUGEntity> findAllRezervateDeAnulat(Date dataTinta);}