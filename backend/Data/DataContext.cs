using backend.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DataContext : IdentityDbContext<User, AppRole, int, 
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<NotificationUser>().HasKey(nu => new { nu.UserId, nu.NotificationId });

            modelBuilder.Entity<User>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            modelBuilder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        }

        public DbSet<Call> Calls { get; set; }
        public DbSet<Checklist> Checklists { get; set; }
        public DbSet<Crew> Crews { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<HistoryOfSafetyDocumentStateChange> HistoryOfSafetyDocumentStateChanges { get; set; }
        public DbSet<HistoryOfWorkPlanStateChange> HistoryOfWorkPlanStateChanges { get; set; }
        public DbSet<HistoryOfWorkRequestStateChange> HistoryOfWorkRequestStateChanges { get; set; }
        public DbSet<Incident> Incidents { get; set; }
        public DbSet<IncidentPhoto> IncidentPhotos { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationUser> NotificationUsers { get; set; }
        public DbSet<Resolution> Resolutions { get; set; }
        public DbSet<SafetyDocument> SafetyDocuments { get; set; }
        public DbSet<SafetyDocumentPhoto> SafetyDocumentPhotos { get; set; }
        public DbSet<WorkInstruction> WorkInstructions { get; set; }
        public DbSet<WorkPlan> WorkPlans { get; set; }
        public DbSet<WorkPlanPhoto> WorkPlanPhotos { get; set; }
        public DbSet<WorkRequest> WorkRequests { get; set; }
        public DbSet<WorkRequestPhoto> WorkRequestPhotos { get; set; }
    }
}