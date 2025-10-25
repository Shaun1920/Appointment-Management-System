package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Staff;
import com.appointment.bookingsystem.services.StaffService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PostMapping("/add")
    public Staff addStaff(@RequestBody Staff staff) {
        return staffService.addStaff(staff);
    }

    @GetMapping("/all")
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @PutMapping("/update-status/{id}")
    public Staff updateStatus(@PathVariable Long id, @RequestParam String status) {
        return staffService.updateStatus(id, status);
    }
}
