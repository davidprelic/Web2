namespace backend.Entities
{
    public class Checklist
    {
        public int Id { get; set; }
        public bool? WorkOperationsCompleted { get; set; }
        public bool? TagsRemoved { get; set; }
        public bool? GroundingRemoved { get; set; }
        public bool? ReadyForService { get; set; }

        public SafetyDocument SafetyDocument { get; set; }
    }
}