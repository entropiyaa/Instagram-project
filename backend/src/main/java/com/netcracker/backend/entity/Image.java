package com.netcracker.backend.entity;

import javax.persistence.*;

@Entity
public class Image {

    private Long id;
    private String name;
    private String type;
    private byte[] pic;

    public Image() {}

    public Image(String name, String type, byte[] pic) {
        this.name = name;
        this.type = type;
        this.pic = pic;
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Lob
    @Column(name = "pic")
    public byte[] getPic() {
        return pic;
    }

    public void setPic(byte[] pic) {
        this.pic = pic;
    }
}
