public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(System.in);
        int count = 0;
        
        for (int i = 1; i < args.length; i++) {
            for (int j = i + 1; j < args.length; j++) {
                if (Integer.parseInt(args[i]) + Integer.parseInt(args[j]) == target) {
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
