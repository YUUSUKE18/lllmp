public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(args[0]);
        int[] numbers = new int[2];
        for (int i = 1; i < args.length; i++) {
            int num = Integer.parseInt(args[i]);
            numbers = new int[2];
            numbers[0] = numbers[0] + num;
            numbers[1] = numbers[1] + num;
        }
        int count = 0;
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                if (numbers[i] + numbers[j] == target) {
                    count++;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
