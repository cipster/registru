package model;import javax.persistence.*;@Entity@Table(name = "destinatar", schema = "", catalog = "registru")public class DestinatarEntity {    private long idDestinatar;    private String destinatar;    @Id    @Column(name = "id_destinatar", nullable = false, insertable = true, updatable = true)    public long getIdDestinatar() {        return idDestinatar;    }    public void setIdDestinatar(long idDestinatar) {        this.idDestinatar = idDestinatar;    }    @Basic    @Column(name = "destinatar", nullable = false, insertable = true, updatable = true, length = 250)    public String getDestinatar() {        return destinatar;    }    public void setDestinatar(String destinatar) {        this.destinatar = destinatar;    }    @Override    public boolean equals(Object o) {        if (this == o) return true;        if (o == null || getClass() != o.getClass()) return false;        DestinatarEntity that = (DestinatarEntity) o;        if (idDestinatar != that.idDestinatar) return false;        if (destinatar != null ? !destinatar.equals(that.destinatar) : that.destinatar != null) return false;        return true;    }    @Override    public int hashCode() {        int result = (int) (idDestinatar ^ (idDestinatar >>> 32));        result = 31 * result + (destinatar != null ? destinatar.hashCode() : 0);        return result;    }}