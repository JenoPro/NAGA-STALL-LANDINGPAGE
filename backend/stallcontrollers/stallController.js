import { createConnection } from '../config/database.js'

// Get all stalls (for landing page)
export const getAllStalls = async (req, res) => {
  let connection
  try {
    connection = await createConnection()

    const [stalls] = await connection.execute(`
      SELECT 
        s.*,
        CONCAT(a1.first_name, ' ', a1.last_name) as created_by_name,
        CONCAT(a2.first_name, ' ', a2.last_name) as updated_by_name
      FROM Stall s
      LEFT JOIN Admin a1 ON s.created_by = a1.ID
      LEFT JOIN Admin a2 ON s.updated_by = a2.ID
      WHERE s.is_available = TRUE AND s.status = 'Active'
      ORDER BY s.created_at DESC
    `)

    res.json({
      success: true,
      message: 'Available stalls retrieved successfully',
      data: stalls,
    })
  } catch (error) {
    console.error('❌ Get stalls error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve stalls',
      error: error.message,
    })
  } finally {
    if (connection) await connection.end()
  }
}

// Get stall by ID
export const getStallById = async (req, res) => {
  let connection
  try {
    const { id } = req.params
    connection = await createConnection()

    const [stalls] = await connection.execute(
      `
      SELECT 
        s.*,
        CONCAT(a1.first_name, ' ', a1.last_name) as created_by_name,
        CONCAT(a2.first_name, ' ', a2.last_name) as updated_by_name
      FROM Stall s
      LEFT JOIN Admin a1 ON s.created_by = a1.ID
      LEFT JOIN Admin a2 ON s.updated_by = a2.ID
      WHERE s.ID = ? AND s.is_available = TRUE AND s.status = 'Active'
    `,
      [id],
    )

    if (stalls.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Stall not found or not available',
      })
    }

    res.json({
      success: true,
      message: 'Stall retrieved successfully',
      data: stalls[0],
    })
  } catch (error) {
    console.error('❌ Get stall by ID error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve stall',
      error: error.message,
    })
  } finally {
    if (connection) await connection.end()
  }
}

// Get stalls by location/market
export const getStallsByLocation = async (req, res) => {
  let connection
  try {
    const { location } = req.query
    connection = await createConnection()

    let query = `
      SELECT 
        s.*,
        CONCAT(a1.first_name, ' ', a1.last_name) as created_by_name,
        CONCAT(a2.first_name, ' ', a2.last_name) as updated_by_name
      FROM Stall s
      LEFT JOIN Admin a1 ON s.created_by = a1.ID
      LEFT JOIN Admin a2 ON s.updated_by = a2.ID
      WHERE s.is_available = TRUE AND s.status = 'Active'
    `
    const queryParams = []

    if (location && location !== 'all') {
      query += ' AND s.location = ?'
      queryParams.push(location)
    }

    query += ' ORDER BY s.created_at DESC'

    const [stalls] = await connection.execute(query, queryParams)

    res.json({
      success: true,
      message: 'Stalls retrieved successfully',
      data: stalls,
      count: stalls.length,
      filters: { location },
    })
  } catch (error) {
    console.error('❌ Get stalls by location error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve stalls',
      error: error.message,
    })
  } finally {
    if (connection) await connection.end()
  }
}

// Get available markets/locations
export const getAvailableMarkets = async (req, res) => {
  let connection
  try {
    connection = await createConnection()

    const [markets] = await connection.execute(`
      SELECT DISTINCT location as market, COUNT(*) as stall_count
      FROM Stall 
      WHERE is_available = TRUE AND status = 'Active'
      GROUP BY location
      ORDER BY location
    `)

    res.json({
      success: true,
      message: 'Available markets retrieved successfully',
      data: markets,
    })
  } catch (error) {
    console.error('❌ Get available markets error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve available markets',
      error: error.message,
    })
  } finally {
    if (connection) await connection.end()
  }
}