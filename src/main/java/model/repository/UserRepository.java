package model.repository;import model.UserEntity;import org.springframework.data.repository.CrudRepository;public interface UserRepository extends CrudRepository<UserEntity, Long> {    UserEntity findOneByUsernameEquals(String username);}