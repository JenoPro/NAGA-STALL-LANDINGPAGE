# Backend API Updates Required - Branch-Based Architecture

## Overview
The frontend has been updated to use **branch-based architecture** instead of area-based. This document outlines all the backend changes required to support the new frontend implementation.

## Current Error
```
GET http://localhost:3001/api/stalls/branches 401 (Unauthorized)
```

## Required API Endpoint Changes

### 1. **NEW: Get All Branches**
```
GET /api/stalls/branches
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    { "branch": "Naga City People's Mall" },
    { "branch": "Satellite Market 1" },
    { "branch": "Satellite Market 2" }
  ]
}
```

**Purpose:** Replace the old `/api/stalls/areas` endpoint. This should return actual branch names that will be displayed in the navigation.

---

### 2. **UPDATE: Get Locations by Branch**
```
GET /api/stalls/locations?branch={branchName}
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "location": "Section A",
      "branch": "Naga City People's Mall"
    },
    {
      "id": 2,
      "location": "Section B", 
      "branch": "Naga City People's Mall"
    }
  ]
}
```

**Changes from Current:**
- Parameter changed from `?area=` to `?branch=`
- Should filter locations by the specific branch name

---

### 3. **UPDATE: Get Stalls by Branch**
```
GET /api/stalls/by-branch?branch={branchName}
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "stallNumber": "A-001",
      "branch": "Naga City People's Mall",
      "branchLocation": "Section A",
      "price": "₱2,500/month",
      "dimensions": "3m x 3m",
      "floor": "Ground Floor",
      "section": "Food Court",
      "isAvailable": true,
      "description": "Perfect for food business",
      "imageUrl": "stall-image.jpg"
    }
  ]
}
```

**Changes from Current:**
- Endpoint changed from `/api/stalls/by-area` to `/api/stalls/by-branch`
- Parameter changed from `?area=` to `?branch=`
- Ensure `branch` field contains actual branch names (not generic area names)

---

### 4. **UPDATE: Filter Stalls by Branch**
```
GET /api/stalls/filter?branch={branchName}&location={location}&priceRange={range}&availability={bool}&search={term}
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    // Array of filtered stalls matching the criteria
  ]
}
```

**Changes from Current:**
- Parameter changed from `?area=` to `?branch=`
- All filtering logic should work with branch names instead of area names

---

## Data Structure Updates

### Branch Names to Use:
Instead of generic names like "Naga City" or "Test_Area", use actual branch names:

1. **"Naga City People's Mall"** (Main branch)
2. **"Satellite Market 1"** 
3. **"Satellite Market 2"**
4. Add more branches as needed

### Database Schema Considerations:
If you're currently storing area information, consider:

1. **Update existing area fields** to use actual branch names
2. **Migration script** to convert existing data from area-based to branch-based
3. **Indexes** on branch fields for better query performance

---

## Authentication/Authorization Check

The 401 error suggests there might be authentication issues. Please verify:

1. **CORS settings** are properly configured for the frontend domain
2. **Authentication middleware** is not blocking the requests
3. **API routes** are properly registered and accessible
4. **Environment configuration** is correct for the development setup

---

## Testing Endpoints

You can test the new endpoints using:

```bash
# Test branches endpoint
curl -X GET "http://localhost:3001/api/stalls/branches"

# Test locations by branch
curl -X GET "http://localhost:3001/api/stalls/locations?branch=Naga%20City%20People's%20Mall"

# Test stalls by branch  
curl -X GET "http://localhost:3001/api/stalls/by-branch?branch=Satellite%20Market%201"

# Test filtered stalls
curl -X GET "http://localhost:3001/api/stalls/filter?branch=Naga%20City%20People's%20Mall&availability=true"
```

---

## Migration Notes

### For Existing Data:
1. **Areas → Branches mapping:**
   - "Naga City" → "Naga City People's Mall"
   - "Test_Area" → "Satellite Market 1" (or appropriate name)

2. **Update all stall records** to use the new branch naming convention

3. **Verify data consistency** after migration

---

## Priority Order

1. **HIGH:** Fix the 401 authentication issue for `/api/stalls/branches`
2. **HIGH:** Implement the `/api/stalls/branches` endpoint
3. **MEDIUM:** Update `/api/stalls/by-branch` endpoint  
4. **MEDIUM:** Update `/api/stalls/locations` to use branch parameter
5. **LOW:** Update filter endpoint to use branch parameter

---

## Contact

If you need clarification on any of these requirements or need to discuss the implementation approach, please reach out to the frontend team.

**Frontend Changes Already Completed:**
- All API calls updated to use branch endpoints
- UI updated to display actual branch names
- Component logic updated for branch-based architecture