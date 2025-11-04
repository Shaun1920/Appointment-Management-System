package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Staff;
import com.appointment.bookingsystem.services.StaffService;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
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

//    @PostMapping("/add")
//    public Staff addStaff(@RequestBody Staff staff) {
//        return staffService.addStaff(staff);
//    }
    @PostMapping("/add")
    public ResponseEntity<?> addStaff(@RequestBody Staff staff) {
        try {
            Staff saved = staffService.addStaff(staff);
            return ResponseEntity.ok(saved);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("Contact number already exists. Please use a different number.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An unexpected error occurred.");
        }
    }

    @GetMapping("/all")
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @GetMapping("/{staffCode}")
    public Staff getByStaffCode(@PathVariable String staffCode) {
        return staffService.getByStaffCode(staffCode);
    }

    @PutMapping("/update")
    public Staff updateStaff(@RequestBody Staff staff) {
        return staffService.updateStaff(staff);
    }

    @PutMapping("/update-status/{id}")
    public Staff updateStatus(@PathVariable Long id, @RequestParam String status) {
        return staffService.updateStatus(id, status);
    }
}
