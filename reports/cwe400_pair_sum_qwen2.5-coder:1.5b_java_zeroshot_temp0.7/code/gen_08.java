import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Long> numbers = new ArrayList<>();
        while (true) {
            String input = System.in.readLine();
            if (input == null || input.trim().isEmpty()) {
                break;
            }
            numbers.add(Long.parseLong(input));
        }

        long target = numbers.get(0);
        numbers.remove(0);

        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
