package model.repository;import model.entity.UserRoleEntity;import org.springframework.data.repository.CrudRepository;import java.util.List;public interface UserRoleRepository extends CrudRepository<UserRoleEntity, Long> {    List<UserRoleEntity> findAllByUsernameEquals(String username);}