package com.appointment.bookingsystem.services;

import com.appointment.bookingsystem.entity.Staff;
import com.appointment.bookingsystem.repository.StaffRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StaffService {

    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public Staff addStaff(Staff staff) {
        staff.setStatus("Pending");
        staff.setPassword(staff.getName() + "@" + staff.getDateOfBirth());

        // Save first to generate DB ID
        Staff savedStaff = staffRepository.save(staff);

        // Generate custom staffCode like staff_001
        String code = "staff_" + String.format("%03d", savedStaff.getStaffId());
        savedStaff.setStaffCode(code);

        return staffRepository.save(savedStaff);
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff updateStatus(Long staffId, String status) {
        Staff staff = staffRepository.findById(staffId).orElse(null);
        if (staff != null) {
            staff.setStatus(status);
            return staffRepository.save(staff);
        }
        return null;
    }
}
