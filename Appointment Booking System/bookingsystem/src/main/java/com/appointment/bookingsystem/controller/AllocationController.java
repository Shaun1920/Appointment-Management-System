//package com.appointment.bookingsystem.controller;
//
//import com.appointment.bookingsystem.entity.Allocation;
//import com.appointment.bookingsystem.services.AllocationService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/allocations")
//@CrossOrigin(origins = "http://localhost:4200/") // allow your Angular frontend
//public class AllocationController {
//
//    private final AllocationService allocationService;
//
//    public AllocationController(AllocationService allocationService) {
//        this.allocationService = allocationService;
//    }
//
//    @GetMapping("/all")
//    public List<Allocation> getAllAllocations() {
//        return allocationService.getAllAllocations();
//    }
//
//    @PostMapping("/add")
//    public Allocation addAllocation(@RequestBody Allocation allocation) {
//        return allocationService.addAllocation(allocation);
//    }
//
//    @PutMapping("/update")
//    public Allocation updateAllocation(@RequestBody Allocation allocation) {
//        return allocationService.updateAllocation(allocation);
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public void deleteAllocation(@PathVariable Long id) {
//        allocationService.deleteAllocation(id);
//    }
//
//    @GetMapping("/{id}")
//    public Allocation getAllocationById(@PathVariable Long id) {
//        return allocationService.getAllocationById(id).orElse(null);
//    }
//}

package com.appointment.bookingsystem.controller;

import com.appointment.bookingsystem.entity.Allocation;
import com.appointment.bookingsystem.services.AllocationService;
import com.appointment.bookingsystem.repository.AllocationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allocations")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend
public class AllocationController {

    private final AllocationService allocationService;
    private final AllocationRepository allocationRepository;

    public AllocationController(AllocationService allocationService, AllocationRepository allocationRepository) {
        this.allocationService = allocationService;
        this.allocationRepository = allocationRepository;
    }

    // ✅ Fetch all allocations
    @GetMapping("/all")
    public List<Allocation> getAllAllocations() {
        return allocationService.getAllAllocations();
    }

    // ✅ Add new allocation
    @PostMapping("/add")
    public Allocation addAllocation(@RequestBody Allocation allocation) {
        return allocationService.addAllocation(allocation);
    }

    // ✅ Update allocation
    @PutMapping("/update")
    public Allocation updateAllocation(@RequestBody Allocation allocation) {
        return allocationService.updateAllocation(allocation);
    }

    // ✅ Delete allocation
    @DeleteMapping("/delete/{id}")
    public void deleteAllocation(@PathVariable Long id) {
        allocationService.deleteAllocation(id);
    }

    // ✅ Get allocation by ID
    @GetMapping("/{id}")
    public Allocation getAllocationById(@PathVariable Long id) {
        return allocationService.getAllocationById(id).orElse(null);
    }

    // ✅ Get allocations by doctor code
    @GetMapping("/doctor/{doctorCode}")
    public List<Allocation> getAllocationsByDoctorCode(@PathVariable String doctorCode) {
        return allocationRepository.findByDoctorCode(doctorCode);
    }
}
