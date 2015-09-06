package model.entity;import javax.persistence.*;import java.sql.Date;import java.sql.Timestamp;@Entity@Table(name = "intrare", schema = "", catalog = "registru")public class IntrareEntity {    private long idIntrare;    private String nrCrt;    private Date dataIntrarii;    private String nrHartieiIntrate;    private String deLaCineVineCorespondenta;    private String continut;    private Long idTipContinut;    private String rezolutiiSiTermene;    private Integer anulat;    private Integer rezervat;    private Integer formatFizic;    private String creatDe;    private Timestamp creatLa;    @Id    @Column(name = "id_intrare", nullable = false, insertable = true, updatable = true)    public long getIdIntrare() {        return idIntrare;    }    public void setIdIntrare(long idIntrare) {        this.idIntrare = idIntrare;    }    @Basic    @Column(name = "nr_crt", nullable = false, insertable = true, updatable = true, length = 250)    public String getNrCrt() {        return nrCrt;    }    public void setNrCrt(String nrCrt) {        this.nrCrt = nrCrt;    }    @Basic    @Column(name = "data_intrarii", nullable = false, insertable = true, updatable = true)    public Date getDataIntrarii() {        return dataIntrarii;    }    public void setDataIntrarii(Date dataIntrarii) {        this.dataIntrarii = dataIntrarii;    }    @Basic    @Column(name = "nr_hartiei_intrate", nullable = false, insertable = true, updatable = true, length = 250)    public String getNrHartieiIntrate() {        return nrHartieiIntrate;    }    public void setNrHartieiIntrate(String nrHartieiIntrate) {        this.nrHartieiIntrate = nrHartieiIntrate;    }    @Basic    @Column(name = "de_la_cine_vine_corespondenta", nullable = false, insertable = true, updatable = true, length = 255)    public String getDeLaCineVineCorespondenta() {        return deLaCineVineCorespondenta;    }    public void setDeLaCineVineCorespondenta(String deLaCineVineCorespondenta) {        this.deLaCineVineCorespondenta = deLaCineVineCorespondenta;    }    @Basic    @Column(name = "continut", nullable = false, insertable = true, updatable = true, length = 65535)    public String getContinut() {        return continut;    }    public void setContinut(String continut) {        this.continut = continut;    }    @Basic    @Column(name = "id_tip_continut", nullable = false, insertable = true, updatable = true)    public Long getIdTipContinut() {        return idTipContinut;    }    public void setIdTipContinut(Long idTipContinut) {        this.idTipContinut = idTipContinut;    }    @Basic    @Column(name = "rezolutii_si_termene", nullable = false, insertable = true, updatable = true, length = 65535)    public String getRezolutiiSiTermene() {        return rezolutiiSiTermene;    }    public void setRezolutiiSiTermene(String rezolutiiSiTermene) {        this.rezolutiiSiTermene = rezolutiiSiTermene;    }    @Basic    @Column(name = "anulat", nullable = true, insertable = true, updatable = true)    public Integer getAnulat() {        return anulat;    }    public void setAnulat(Integer anulat) {        this.anulat = anulat;    }    @Basic    @Column(name = "rezervat", nullable = true, insertable = true, updatable = true)    public Integer getRezervat() {        return rezervat;    }    public void setRezervat(Integer rezervat) {        this.rezervat = rezervat;    }    @Basic    @Column(name = "format_fizic", nullable = true, insertable = true, updatable = true)    public Integer getFormatFizic() {        return formatFizic;    }    public void setFormatFizic(Integer formatFizic) {        this.formatFizic = formatFizic;    }    @Basic    @Column(name = "creat_de", nullable = false, insertable = true, updatable = true, length = 250)    public String getCreatDe() {        return creatDe;    }    public void setCreatDe(String creatDe) {        this.creatDe = creatDe;    }    @Basic    @Column(name = "creat_la", nullable = false, insertable = true, updatable = true)    public Timestamp getCreatLa() {        return creatLa;    }    public void setCreatLa(Timestamp creatLa) {        this.creatLa = creatLa;    }    @Override    public boolean equals(Object o) {        if (this == o) return true;        if (o == null || getClass() != o.getClass()) return false;        IntrareEntity that = (IntrareEntity) o;        if (idIntrare != that.idIntrare) return false;        if (idTipContinut != that.idTipContinut) return false;        if (nrCrt != null ? !nrCrt.equals(that.nrCrt) : that.nrCrt != null) return false;        if (dataIntrarii != null ? !dataIntrarii.equals(that.dataIntrarii) : that.dataIntrarii != null) return false;        if (nrHartieiIntrate != null ? !nrHartieiIntrate.equals(that.nrHartieiIntrate) : that.nrHartieiIntrate != null) return false;        if (deLaCineVineCorespondenta != null ? !deLaCineVineCorespondenta.equals(that.deLaCineVineCorespondenta) : that.deLaCineVineCorespondenta != null) return false;        if (continut != null ? !continut.equals(that.continut) : that.continut != null) return false;        if (rezolutiiSiTermene != null ? !rezolutiiSiTermene.equals(that.rezolutiiSiTermene) : that.rezolutiiSiTermene != null) return false;        if (anulat != null ? !anulat.equals(that.anulat) : that.anulat != null) return false;        if (rezervat != null ? !rezervat.equals(that.rezervat) : that.rezervat != null) return false;        if (formatFizic != null ? !formatFizic.equals(that.formatFizic) : that.formatFizic != null) return false;        if (creatDe != null ? !creatDe.equals(that.creatDe) : that.creatDe != null) return false;        if (creatLa != null ? !creatLa.equals(that.creatLa) : that.creatLa != null) return false;        return true;    }    @Override    public int hashCode() {        int result = (int) (idIntrare ^ (idIntrare >>> 32));        result = 31 * result + (nrCrt != null ? nrCrt.hashCode() : 0);        result = 31 * result + (dataIntrarii != null ? dataIntrarii.hashCode() : 0);        result = 31 * result + (nrHartieiIntrate != null ? nrHartieiIntrate.hashCode() : 0);        result = 31 * result + (deLaCineVineCorespondenta != null ? deLaCineVineCorespondenta.hashCode() : 0);        result = 31 * result + (continut != null ? continut.hashCode() : 0);        result = 31 * result + (int) (idTipContinut ^ (idTipContinut >>> 32));        result = 31 * result + (rezolutiiSiTermene != null ? rezolutiiSiTermene.hashCode() : 0);        result = 31 * result + (anulat != null ? anulat.hashCode() : 0);        result = 31 * result + (rezervat != null ? rezervat.hashCode() : 0);        result = 31 * result + (formatFizic != null ? formatFizic.hashCode() : 0);        result = 31 * result + (creatDe != null ? creatDe.hashCode() : 0);        result = 31 * result + (creatLa != null ? creatLa.hashCode() : 0);        return result;    }}