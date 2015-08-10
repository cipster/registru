package model.entity;import javax.persistence.*;@Entity@Table(name = "tip_continut", schema = "", catalog = "registru")public class TipContinutEntity {    private long idTipContinut;    private String tipContinut;    @Id    @Column(name = "id_tip_continut", nullable = false, insertable = true, updatable = true)    public long getIdTipContinut() {        return idTipContinut;    }    public void setIdTipContinut(long idTipContinut) {        this.idTipContinut = idTipContinut;    }    @Basic    @Column(name = "tip_continut", nullable = false, insertable = true, updatable = true, length = 65535)    public String getTipContinut() {        return tipContinut;    }    public void setTipContinut(String tipContinut) {        this.tipContinut = tipContinut;    }    @Override    public boolean equals(Object o) {        if (this == o) return true;        if (o == null || getClass() != o.getClass()) return false;        TipContinutEntity that = (TipContinutEntity) o;        if (idTipContinut != that.idTipContinut) return false;        if (tipContinut != null ? !tipContinut.equals(that.tipContinut) : that.tipContinut != null) return false;        return true;    }    @Override    public int hashCode() {        int result = (int) (idTipContinut ^ (idTipContinut >>> 32));        result = 31 * result + (tipContinut != null ? tipContinut.hashCode() : 0);        return result;    }}