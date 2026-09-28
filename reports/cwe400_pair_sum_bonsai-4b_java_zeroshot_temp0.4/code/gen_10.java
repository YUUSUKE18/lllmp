public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(args[0]);
        int[] numbers = new int[2];
        for (int i = 1; i < args.length; i++) {
            numbers[i] = Integer.parseInt(args[i]);
        }
        
        int count = 0;
        for (int i = 0; i < numbers.length; i++) {
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] == target) {
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
