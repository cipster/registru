package model.repository;import model.entity.IntrareEntity;import org.springframework.data.repository.CrudRepository;public interface IntrareRepository extends CrudRepository<IntrareEntity, Long> {    IntrareEntity findTop1ByOrderByIdIntrareDesc();    IntrareEntity findOneByNrCrtEquals(String nrCrt);}