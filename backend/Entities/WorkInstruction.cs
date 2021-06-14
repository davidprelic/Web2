namespace backend.Entities
{
    public class WorkInstruction
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string InstructionText { get; set; }
        public string Status { get; set; }

        
        public int? DeviceId { get; set; }
        public Device Device { get; set; }

        public int WorkPlanId { get; set; }
        public WorkPlan WorkPlan { get; set; }
    }
}