import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(args[0]);
        int[] numbers = Arrays.stream(System.in).skip(1).mapToInt(Integer::parseInt).toArray();

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
