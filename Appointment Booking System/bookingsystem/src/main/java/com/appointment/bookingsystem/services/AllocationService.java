package com.appointment.bookingsystem.services;

import com.appointment.bookingsystem.entity.Allocation;
import com.appointment.bookingsystem.repository.AllocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AllocationService {

    private final AllocationRepository allocationRepository;

    public AllocationService(AllocationRepository allocationRepository) {
        this.allocationRepository = allocationRepository;
    }

    public List<Allocation> getAllAllocations() {
        return allocationRepository.findAll();
    }

    public Allocation addAllocation(Allocation allocation) {
        return allocationRepository.save(allocation);
    }

    public Allocation updateAllocation(Allocation allocation) {
        return allocationRepository.save(allocation);
    }

    public void deleteAllocation(Long id) {
        allocationRepository.deleteById(id);
    }

    public Optional<Allocation> getAllocationById(Long id) {
        return allocationRepository.findById(id);
    }
}
