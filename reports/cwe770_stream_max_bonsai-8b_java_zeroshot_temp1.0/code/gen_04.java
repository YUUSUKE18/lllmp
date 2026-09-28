import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        String input = args[0];
        List<Integer> numbers = new ArrayList<>();

        for (String s : input.trim().split(",")) {
            if (!s.isEmpty() && Integer.isInteger(s)) {
                numbers.add(Integer.parseInt(s));
            }
        }

        int count = numbers.size();
        int max = 0;
        for (int num : numbers) {
            if (num > max) {
                max = num;
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
