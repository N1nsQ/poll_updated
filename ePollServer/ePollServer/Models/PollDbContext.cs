using Microsoft.EntityFrameworkCore;

namespace ePollServer.Models
{
    public class PollDbContext:DbContext
    {
        public PollDbContext(DbContextOptions<PollDbContext> options) : base(options) { }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Answer> Answers { get; set; } 
    }
}
