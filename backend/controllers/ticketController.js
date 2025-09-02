const { Ticket, TicketResponse, User } = require('../models');

const getOpenTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { status: 'open' },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const respondToTicket = async (req, res) => {
  const { ticketId, message } = req.body;
  try {
    // Create response
    await TicketResponse.create({
      ticket_id: ticketId,
      admin_id: req.admin.id,
      message
    });

    // Update ticket status to closed
    await Ticket.update({ status: 'closed' }, { where: { id: ticketId } });

    res.json({ message: 'Ticket responded and closed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getOpenTickets, respondToTicket };