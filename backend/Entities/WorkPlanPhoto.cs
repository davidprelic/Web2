namespace backend.Entities
{
    public class WorkPlanPhoto
    {
        public int Id { get; set; }
        public string Path { get; set; }
        
        public int WorkPlanId { get; set; }
        public WorkPlan WorkPlan { get; set; }
    }
}