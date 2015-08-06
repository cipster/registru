package model;import javax.persistence.*;import java.sql.Date;import java.sql.Timestamp;@Entity@Table(name = "iesire", schema = "", catalog = "registru")public class IesireEntity {    private long idIesire;    private Date dataIesirii;    private String rezolvare;    private String catreCineSALucrat;    private String nrDosarSiAn;    private String dataSiNrDeIntrare;    private String nrSiDataRevenirii;    private Integer rezervat;    private Integer anulat;    private Integer formatFizic;    private String creatDe;    private Timestamp creatLa;    @Id    @Column(name = "id_iesire", nullable = false, insertable = true, updatable = true)    public long getIdIesire() {        return idIesire;    }    public void setIdIesire(long idIesire) {        this.idIesire = idIesire;    }    @Basic    @Column(name = "data_iesirii", nullable = false, insertable = true, updatable = true)    public Date getDataIesirii() {        return dataIesirii;    }    public void setDataIesirii(Date dataIesirii) {        this.dataIesirii = dataIesirii;    }    @Basic    @Column(name = "rezolvare", nullable = false, insertable = true, updatable = true, length = 65535)    public String getRezolvare() {        return rezolvare;    }    public void setRezolvare(String rezolvare) {        this.rezolvare = rezolvare;    }    @Basic    @Column(name = "catre_cine_s-a_lucrat", nullable = false, insertable = true, updatable = true, length = 250)    public String getCatreCineSALucrat() {        return catreCineSALucrat;    }    public void setCatreCineSALucrat(String catreCineSALucrat) {        this.catreCineSALucrat = catreCineSALucrat;    }    @Basic    @Column(name = "nr_dosar_si_an", nullable = false, insertable = true, updatable = true, length = 250)    public String getNrDosarSiAn() {        return nrDosarSiAn;    }    public void setNrDosarSiAn(String nrDosarSiAn) {        this.nrDosarSiAn = nrDosarSiAn;    }    @Basic    @Column(name = "data_si_nr_de_intrare", nullable = false, insertable = true, updatable = true, length = 250)    public String getDataSiNrDeIntrare() {        return dataSiNrDeIntrare;    }    public void setDataSiNrDeIntrare(String dataSiNrDeIntrare) {        this.dataSiNrDeIntrare = dataSiNrDeIntrare;    }    @Basic    @Column(name = "nr_si_data_revenirii", nullable = true, insertable = true, updatable = true, length = 250)    public String getNrSiDataRevenirii() {        return nrSiDataRevenirii;    }    public void setNrSiDataRevenirii(String nrSiDataRevenirii) {        this.nrSiDataRevenirii = nrSiDataRevenirii;    }    @Basic    @Column(name = "rezervat", nullable = true, insertable = true, updatable = true)    public Integer getRezervat() {        return rezervat;    }    public void setRezervat(Integer rezervat) {        this.rezervat = rezervat;    }    @Basic    @Column(name = "anulat", nullable = true, insertable = true, updatable = true)    public Integer getAnulat() {        return anulat;    }    public void setAnulat(Integer anulat) {        this.anulat = anulat;    }    @Basic    @Column(name = "format_fizic", nullable = true, insertable = true, updatable = true)    public Integer getFormatFizic() {        return formatFizic;    }    public void setFormatFizic(Integer formatFizic) {        this.formatFizic = formatFizic;    }    @Basic    @Column(name = "creat_de", nullable = false, insertable = true, updatable = true, length = 250)    public String getCreatDe() {        return creatDe;    }    public void setCreatDe(String creatDe) {        this.creatDe = creatDe;    }    @Basic    @Column(name = "creat_la", nullable = false, insertable = true, updatable = true)    public Timestamp getCreatLa() {        return creatLa;    }    public void setCreatLa(Timestamp creatLa) {        this.creatLa = creatLa;    }    @Override    public boolean equals(Object o) {        if (this == o) return true;        if (o == null || getClass() != o.getClass()) return false;        IesireEntity that = (IesireEntity) o;        if (idIesire != that.idIesire) return false;        if (dataIesirii != null ? !dataIesirii.equals(that.dataIesirii) : that.dataIesirii != null) return false;        if (rezolvare != null ? !rezolvare.equals(that.rezolvare) : that.rezolvare != null) return false;        if (catreCineSALucrat != null ? !catreCineSALucrat.equals(that.catreCineSALucrat) : that.catreCineSALucrat != null) return false;        if (nrDosarSiAn != null ? !nrDosarSiAn.equals(that.nrDosarSiAn) : that.nrDosarSiAn != null) return false;        if (dataSiNrDeIntrare != null ? !dataSiNrDeIntrare.equals(that.dataSiNrDeIntrare) : that.dataSiNrDeIntrare != null) return false;        if (nrSiDataRevenirii != null ? !nrSiDataRevenirii.equals(that.nrSiDataRevenirii) : that.nrSiDataRevenirii != null) return false;        if (rezervat != null ? !rezervat.equals(that.rezervat) : that.rezervat != null) return false;        if (anulat != null ? !anulat.equals(that.anulat) : that.anulat != null) return false;        if (formatFizic != null ? !formatFizic.equals(that.formatFizic) : that.formatFizic != null) return false;        if (creatDe != null ? !creatDe.equals(that.creatDe) : that.creatDe != null) return false;        if (creatLa != null ? !creatLa.equals(that.creatLa) : that.creatLa != null) return false;        return true;    }    @Override    public int hashCode() {        int result = (int) (idIesire ^ (idIesire >>> 32));        result = 31 * result + (dataIesirii != null ? dataIesirii.hashCode() : 0);        result = 31 * result + (rezolvare != null ? rezolvare.hashCode() : 0);        result = 31 * result + (catreCineSALucrat != null ? catreCineSALucrat.hashCode() : 0);        result = 31 * result + (nrDosarSiAn != null ? nrDosarSiAn.hashCode() : 0);        result = 31 * result + (dataSiNrDeIntrare != null ? dataSiNrDeIntrare.hashCode() : 0);        result = 31 * result + (nrSiDataRevenirii != null ? nrSiDataRevenirii.hashCode() : 0);        result = 31 * result + (rezervat != null ? rezervat.hashCode() : 0);        result = 31 * result + (anulat != null ? anulat.hashCode() : 0);        result = 31 * result + (formatFizic != null ? formatFizic.hashCode() : 0);        result = 31 * result + (creatDe != null ? creatDe.hashCode() : 0);        result = 31 * result + (creatLa != null ? creatLa.hashCode() : 0);        return result;    }}