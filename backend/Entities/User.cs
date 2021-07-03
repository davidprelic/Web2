using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace backend.Entities
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string UserRole { get; set; }
        public string ProfilePicturePath { get; set; }
        public string RegistrationStatus { get; set; }

        public int? CrewId { get; set; }
        public Crew Crew { get; set; }
        // public ICollection<CrewMember> CrewMembers { get; set; }
        public ICollection<Incident> Incidents { get; set; }
        public ICollection<NotificationUser> NotificationUsers { get; set; }
        public ICollection<HistoryOfWorkRequestStateChange> HistoryOfWorkRequestStateChanges { get; set; }
        public ICollection<HistoryOfWorkPlanStateChange> HistoryOfWorkPlanStateChanges { get; set; }
        public ICollection<HistoryOfSafetyDocumentStateChange> HistoryOfSafetyDocumentStateChanges { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}