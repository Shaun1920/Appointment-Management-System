package com.appointment.bookingsystem.entity;

import jakarta.persistence.*;

@Entity
public class Allocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String doctorCode; // will come from Doctor.doctorCode
    private String floorRoomNo;
    private String shift;
    private String date; // store as String for simplicity
    private String time;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDoctorCode() { return doctorCode; }
    public void setDoctorCode(String doctorCode) { this.doctorCode = doctorCode; }

    public String getFloorRoomNo() { return floorRoomNo; }
    public void setFloorRoomNo(String floorRoomNo) { this.floorRoomNo = floorRoomNo; }

    public String getShift() { return shift; }
    public void setShift(String shift) { this.shift = shift; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
}
