public class Main {
    public static void main(String[] args) {
        long target = Long.parseLong(args[0]);
        long[] nums = new long[2];
        
        for (int i = 1; i < args.length; i++) {
            nums[i] = Long.parseLong(args[i]);
        }
        
        int pairs = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    pairs++;
                }
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
