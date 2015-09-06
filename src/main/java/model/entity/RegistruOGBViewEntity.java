package model.entity;import javax.persistence.*;import java.sql.Date;import java.sql.Timestamp;@Entity@Table(name = "registru_ogb_view", schema = "", catalog = "registru")public class RegistruOGBViewEntity {    private long idRegistruOgb;    private String nrInregistrare;    private Date dataInregistrare;    private String nrSiDataDocumentului;    private String emitent;    private String continut;    private Date dataExpediere;    private String destinatar;    private Integer anulat;    private Integer rezervat;    private Integer formatFizic;    private String creatDe;    private Timestamp creatLa;    @Id    @Column(name = "id_registru_ogb", nullable = false, insertable = true, updatable = true)    public long getIdRegistruOgb() {        return idRegistruOgb;    }    public void setIdRegistruOgb(long idRegistruOgb) {        this.idRegistruOgb = idRegistruOgb;    }    @Basic    @Column(name = "nr_inregistrare", nullable = false, insertable = true, updatable = true, length = 250)    public String getNrInregistrare() {        return nrInregistrare;    }    public void setNrInregistrare(String nrInregistrare) {        this.nrInregistrare = nrInregistrare;    }    @Basic    @Column(name = "data_inregistrare", nullable = false, insertable = true, updatable = true)    public Date getDataInregistrare() {        return dataInregistrare;    }    public void setDataInregistrare(Date dataInregistrare) {        this.dataInregistrare = dataInregistrare;    }    @Basic    @Column(name = "nr_si_data_documentului", nullable = false, insertable = true, updatable = true, length = 250)    public String getNrSiDataDocumentului() {        return nrSiDataDocumentului;    }    public void setNrSiDataDocumentului(String nrSiDataDocumentului) {        this.nrSiDataDocumentului = nrSiDataDocumentului;    }    @Basic    @Column(name = "emitent", nullable = false, insertable = true, updatable = true, length = 250)    public String getEmitent() {        return emitent;    }    public void setEmitent(String emitent) {        this.emitent = emitent;    }    @Basic    @Column(name = "continut", nullable = false, insertable = true, updatable = true, length = 65535)    public String getContinut() {        return continut;    }    public void setContinut(String continut) {        this.continut = continut;    }    @Basic    @Column(name = "data_expediere", nullable = false, insertable = true, updatable = true)    public Date getDataExpediere() {        return dataExpediere;    }    public void setDataExpediere(Date dataExpediere) {        this.dataExpediere = dataExpediere;    }    @Basic    @Column(name = "destinatar", nullable = false, insertable = true, updatable = true, length = 250)    public String getDestinatar() {        return destinatar;    }    public void setDestinatar(String destinatar) {        this.destinatar = destinatar;    }    @Basic    @Column(name = "anulat", nullable = true, insertable = true, updatable = true)    public Integer getAnulat() {        return anulat;    }    public void setAnulat(Integer anulat) {        this.anulat = anulat;    }    @Basic    @Column(name = "rezervat", nullable = true, insertable = true, updatable = true)    public Integer getRezervat() {        return rezervat;    }    public void setRezervat(Integer rezervat) {        this.rezervat = rezervat;    }    @Basic    @Column(name = "format_fizic", nullable = true, insertable = true, updatable = true)    public Integer getFormatFizic() {        return formatFizic;    }    public void setFormatFizic(Integer formatFizic) {        this.formatFizic = formatFizic;    }    @Basic    @Column(name = "creat_de", nullable = false, insertable = true, updatable = true, length = 250)    public String getCreatDe() {        return creatDe;    }    public void setCreatDe(String creatDe) {        this.creatDe = creatDe;    }    @Basic    @Column(name = "creat_la", nullable = false, insertable = true, updatable = true)    public Timestamp getCreatLa() {        return creatLa;    }    public void setCreatLa(Timestamp creatLa) {        this.creatLa = creatLa;    }    @Override    public boolean equals(Object o) {        if (this == o) return true;        if (o == null || getClass() != o.getClass()) return false;        RegistruOGBViewEntity that = (RegistruOGBViewEntity) o;        if (idRegistruOgb != that.idRegistruOgb) return false;        if (nrInregistrare != null ? !nrInregistrare.equals(that.nrInregistrare) : that.nrInregistrare != null) return false;        if (dataInregistrare != null ? !dataInregistrare.equals(that.dataInregistrare) : that.dataInregistrare != null) return false;        if (nrSiDataDocumentului != null ? !nrSiDataDocumentului.equals(that.nrSiDataDocumentului) : that.nrSiDataDocumentului != null) return false;        if (emitent != null ? !emitent.equals(that.emitent) : that.emitent != null) return false;        if (continut != null ? !continut.equals(that.continut) : that.continut != null) return false;        if (dataExpediere != null ? !dataExpediere.equals(that.dataExpediere) : that.dataExpediere != null) return false;        if (destinatar != null ? !destinatar.equals(that.destinatar) : that.destinatar != null) return false;        if (anulat != null ? !anulat.equals(that.anulat) : that.anulat != null) return false;        if (rezervat != null ? !rezervat.equals(that.rezervat) : that.rezervat != null) return false;        if (formatFizic != null ? !formatFizic.equals(that.formatFizic) : that.formatFizic != null) return false;        if (creatDe != null ? !creatDe.equals(that.creatDe) : that.creatDe != null) return false;        if (creatLa != null ? !creatLa.equals(that.creatLa) : that.creatLa != null) return false;        return true;    }    @Override    public int hashCode() {        int result = (int) (idRegistruOgb ^ (idRegistruOgb >>> 32));        result = 31 * result + (nrInregistrare != null ? nrInregistrare.hashCode() : 0);        result = 31 * result + (dataInregistrare != null ? dataInregistrare.hashCode() : 0);        result = 31 * result + (nrSiDataDocumentului != null ? nrSiDataDocumentului.hashCode() : 0);        result = 31 * result + (emitent != null ? emitent.hashCode() : 0);        result = 31 * result + (continut != null ? continut.hashCode() : 0);        result = 31 * result + (dataExpediere != null ? dataExpediere.hashCode() : 0);        result = 31 * result + (destinatar != null ? destinatar.hashCode() : 0);        result = 31 * result + (anulat != null ? anulat.hashCode() : 0);        result = 31 * result + (rezervat != null ? rezervat.hashCode() : 0);        result = 31 * result + (formatFizic != null ? formatFizic.hashCode() : 0);        result = 31 * result + (creatDe != null ? creatDe.hashCode() : 0);        result = 31 * result + (creatLa != null ? creatLa.hashCode() : 0);        return result;    }}