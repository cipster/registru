package model.entity;import javax.persistence.*;@Entity@Table(name = "user_display", schema = "", catalog = "registru")public class UserDisplayEntity {    private long idUser;    private String username;    private Long idProfil;    private String nume;    private String prenume;    private String email;    private String tel;    private String workTel;    private String fax;    private String lastLogin;    private String lastPassChange;    private Integer enabled;    private String roles;    @Id    @Column(name = "id_user", nullable = false, insertable = true, updatable = true)    public long getIdUser() {        return idUser;    }    public void setIdUser(long idUser) {        this.idUser = idUser;    }    @Basic    @Column(name = "username", nullable = false, insertable = true, updatable = true, length = 45)    public String getUsername() {        return username;    }    public void setUsername(String username) {        this.username = username;    }    @Basic    @Column(name = "id_profil", nullable = false, insertable = true, updatable = true)    public Long getIdProfil() {        return idProfil;    }    public void setIdProfil(Long idProfil) {        this.idProfil = idProfil;    }    @Basic    @Column(name = "nume", nullable = false, insertable = true, updatable = true, length = 250)    public String getNume() {        return nume;    }    public void setNume(String nume) {        this.nume = nume;    }    @Basic    @Column(name = "prenume", nullable = false, insertable = true, updatable = true, length = 250)    public String getPrenume() {        return prenume;    }    public void setPrenume(String prenume) {        this.prenume = prenume;    }    @Basic    @Column(name = "email", nullable = true, insertable = true, updatable = true, length = 250)    public String getEmail() {        return email;    }    public void setEmail(String email) {        this.email = email;    }    @Basic    @Column(name = "tel", nullable = true, insertable = true, updatable = true, length = 250)    public String getTel() {        return tel;    }    public void setTel(String tel) {        this.tel = tel;    }    @Basic    @Column(name = "work_tel", nullable = true, insertable = true, updatable = true, length = 250)    public String getWorkTel() {        return workTel;    }    public void setWorkTel(String workTel) {        this.workTel = workTel;    }    @Basic    @Column(name = "fax", nullable = true, insertable = true, updatable = true, length = 250)    public String getFax() {        return fax;    }    public void setFax(String fax) {        this.fax = fax;    }    @Basic    @Column(name = "last_login", nullable = true, insertable = true, updatable = true, length = 19)    public String getLastLogin() {        return lastLogin;    }    public void setLastLogin(String lastLogin) {        this.lastLogin = lastLogin;    }    @Basic    @Column(name = "last_pass_change", nullable = true, insertable = true, updatable = true, length = 19)    public String getLastPassChange() {        return lastPassChange;    }    public void setLastPassChange(String lastPassChange) {        this.lastPassChange = lastPassChange;    }    @Basic    @Column(name = "enabled", nullable = false, insertable = true, updatable = true)    public Integer getEnabled() {        return enabled;    }    public void setEnabled(Integer enabled) {        this.enabled = enabled;    }    @Basic    @Column(name = "roles", nullable = true, insertable = true, updatable = true, length = 65535)    public String getRoles() {        return roles;    }    public void setRoles(String nameExp13) {        this.roles = nameExp13;    }    @Override    public boolean equals(Object o) {        if (this == o) return true;        if (o == null || getClass() != o.getClass()) return false;        UserDisplayEntity that = (UserDisplayEntity) o;        if (idUser != that.idUser) return false;        if (idProfil != that.idProfil) return false;        if (enabled != that.enabled) return false;        if (username != null ? !username.equals(that.username) : that.username != null) return false;        if (nume != null ? !nume.equals(that.nume) : that.nume != null) return false;        if (prenume != null ? !prenume.equals(that.prenume) : that.prenume != null) return false;        if (email != null ? !email.equals(that.email) : that.email != null) return false;        if (tel != null ? !tel.equals(that.tel) : that.tel != null) return false;        if (workTel != null ? !workTel.equals(that.workTel) : that.workTel != null) return false;        if (fax != null ? !fax.equals(that.fax) : that.fax != null) return false;        if (lastLogin != null ? !lastLogin.equals(that.lastLogin) : that.lastLogin != null) return false;        if (lastPassChange != null ? !lastPassChange.equals(that.lastPassChange) : that.lastPassChange != null) return false;        if (roles != null ? !roles.equals(that.roles) : that.roles != null) return false;        return true;    }    @Override    public int hashCode() {        int result = (int) (idUser ^ (idUser >>> 32));        result = 31 * result + (username != null ? username.hashCode() : 0);        result = 31 * result + (int) (idProfil ^ (idProfil >>> 32));        result = 31 * result + (nume != null ? nume.hashCode() : 0);        result = 31 * result + (prenume != null ? prenume.hashCode() : 0);        result = 31 * result + (email != null ? email.hashCode() : 0);        result = 31 * result + (tel != null ? tel.hashCode() : 0);        result = 31 * result + (workTel != null ? workTel.hashCode() : 0);        result = 31 * result + (fax != null ? fax.hashCode() : 0);        result = 31 * result + (lastLogin != null ? lastLogin.hashCode() : 0);        result = 31 * result + (lastPassChange != null ? lastPassChange.hashCode() : 0);        result = 31 * result + enabled;        result = 31 * result + (roles != null ? roles.hashCode() : 0);        return result;    }}